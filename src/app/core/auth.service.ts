import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from '../interfaces//user';
import { VecindariosService } from './vecindarios.service';

@Injectable()
export class AuthService {

  //Autenticación
  user: Observable<User>;
  usuariosCollection: any;
  usuariosArreglo: any;
  usuarios: any;
  vecindarioId:string;

  constructor(public vs:VecindariosService, public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

  //Autenticación
  this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      });
    this.usuariosCollection = this.afs.collection(`users`, ref => ref.orderBy("fecha_registro", "asc"));
    this.usuarios = this.usuariosCollection.snapshotChanges().
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })).subscribe((items: any) => {
        this.usuariosArreglo = [];
        this.usuariosArreglo = items;
      });
  }


  ingresarEmail(datos): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(datos.email, datos.password)
        .then((user) => {
          // this.actualizarDatosInicio(user);
          resolve(user);
        })
        .catch((err: any) => {
          var message = err.message;
          reject(message);
        });
    });
  }

  registroUsuario(datos): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(datos.email,
        datos.password)
        .then((user) => {
          this.agregarUsuario(user);
          this.actualizarUsuario(user,
            {
              displayName: datos.displayName,
              fecha_nac: datos.fecha_nac,
              genero: datos.genero
            });
            
            // Agregar usuario a la lista de pendientes

            var arreglo = datos.pendientes;
            arreglo.push({
              userId: user.uid,
              displayName: datos.displayName,
              userRef: this.getUserPub(user.uid).ref,
            });
        
            this.vs.actualizar(datos.vecindarioId,
              { pendientes: arreglo }
            );
          resolve(user);
        })
        .catch((err: any) => {
          var message = err.message;
          reject(message);
        });
    });
  }

  reiniciarCont(datos): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.sendPasswordResetEmail(datos.email)
        .then((val: any) => {
          resolve();
        })
        .catch((err: any) => {
          var message = err.message;
          reject(message);
        });
    });
  }

  actualizarUsuario(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data)
  }

  updateUsuario(uid: string, data: any) {
    return this.afs.doc(`users/${uid}`).update(data)
  }

  private agregarUsuario(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      fecha_registro: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: user.displayName,
      photoURL: user.photoURL || null,
      admin: false,
      path: null,
      vecindarios: [],
      actual: null
    }
    return userRef.set(data)
  }

  salir() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/iniciosesion']);
    });
  }

  getUsuarios() {
  
    return this.afs.collection(`users`).snapshotChanges().map(actions => {
      return actions.map(a => {
        return { id: a.payload.doc.id, ...a.payload.doc.data() }
      })
    })
  }


  getUserPub(id) {
    return this.afs.doc<any>(`users/${id}`);
  }

  getUsuario(id) {
    return this.afs.doc<any>(`users/${id}`).valueChanges();

  }

  public getUser(documentId: string) {
    return this.afs.collection('users').doc(documentId).snapshotChanges();
  }


}
