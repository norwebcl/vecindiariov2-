import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import {
  Router, Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { MENUS } from './interfaces/menus'
import { AuthService } from './core/auth.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { VecindariosService } from './core/vecindarios.service';
import { NoticiasService } from './core/noticias.service';
import 'rxjs/add/observable/empty'

const SMALL_WIDTH_BREAKPOINT = 1100;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public loading: boolean = true;

  menus = MENUS;

  @ViewChild('sidenav') sidenav: MatSidenav;

  userId: any = null;

  user: any;

  vecindarios$: any;

  vecindarioActual: any = 0;

  constructor(private ns: NoticiasService, private vs: VecindariosService, public snackBar: MatSnackBar, private router: Router, public authService: AuthService) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

  }

  ngOnInit() {

    this.authService.user.subscribe(user => {
      this.user = user
      if (user) {
        if (user.vecindarios.length > 0) {
          if (this.user.actual) {
            this.vecindarioActual = this.user.actual;
          } else {
            this.vecindarioActual = this.user.vecindarios[0].vecindarioId;
          }
          this.authService.vecindarioId = this.vecindarioActual;
        }
      } else {
      }

    });

    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });


    this.vecindarios$ = this.vs.getVecindarios();



  }

  isScreenSmall(): boolean {
    return window.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`).matches;
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
   
      setTimeout(() => this.loading = false, 1000);

    }

    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }

  }

  salir() {
    this.snackBar.open('Has cerrado sesi??n correctamente, vuelve pronto.', 'CERRAR', {
      duration: 4000
    });
    this.authService.salir();
    this.router.navigate(['/']);
  }

  cambiarVecindario() {
    this.vecindarioActual = this.vecindarioActual;
    this.authService.updateUsuario(this.user.uid, {
      actual: this.vecindarioActual
    })
    this.ns.filtroVecindario$.next(this.vecindarioActual);
    this.authService.vecindarioId = this.vecindarioActual;
    this.router.navigate(['/plaza'])
  }

}
