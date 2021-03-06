
import { Routes } from '@angular/router';

import { RegistroComponent } from './autenticacion/registro/registro.component';
import { InisesComponent } from './autenticacion/inises/inises.component';
import { RecuperarcontComponent } from './autenticacion/recuperarcont/recuperarcont.component';

import { PerfilComponent } from './modulos/perfil/perfil.component';

import { EncuestasComponent } from './modulos/encuestas/encuestas.component';
import { EncuestaComponent } from './modulos/encuesta/encuesta.component';
import { RepositorioComponent } from './modulos/repositorio/repositorio.component';
import { EventosComponent } from './modulos/eventos/eventos.component';
import  {ContactoComponent } from './modulos/contacto/contacto.component';

import { AuthGuard } from './core/auth.guard';
import { LoginGuard } from './core/login.guard';
import { EventoComponent } from './modulos/evento/evento.component';
import { ProntoComponent } from './modulos/pronto/pronto.component';
import { GruposComponent } from './modulos/grupos/grupos.component';
import { GrupoComponent } from './modulos/grupo/grupo.component';
import { VecindariosComponent } from './modulos/vecindarios/vecindarios.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { ProntoGuard } from './core/pronto.guard';
import { PlazaComponent } from './modulos/plaza/plaza.component';


// sections name
const trabajadores = 'Trabajadores';
const posts = 'Posts';
const ingreso = 'Ingreso';
const secciones = 'Secciones';


export const ROUTES: Routes = [
  // home route
  // { path: '', component: BusquedaComponent },
  // { path: 'editar/:id', component: EditarComponent },  
  { path: '', component: PlazaComponent,  canActivate: [AuthGuard, ProntoGuard] },
  // { path: '', component: NoticiasComponent,  canActivate: [AuthGuard, ProntoGuard] },
  // { path: '', component: PublicacionesComponent },
  { path: 'links', component: EncuestasComponent,  canActivate: [AuthGuard] },
  { path: 'link/:id', component: EncuestaComponent,  canActivate: [AuthGuard] },
  { path: 'documentos', component: RepositorioComponent,  canActivate: [AuthGuard] },
  { path: 'agenda', component: EventosComponent,  canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactoComponent,  canActivate: [AuthGuard]},
  // { path: 'noticias', component: NoticiasComponent,  canActivate: [AuthGuard, ProntoGuard] },
  { path: 'agenda/:id', component: EventoComponent,  canActivate: [AuthGuard] },
  // { path: 'bajada/:id', component: BajadaComponent,  canActivate: [AuthGuard] },
  { path: 'pronto', component: ProntoComponent,  canActivate: [AuthGuard] },
  { path: 'grupos', component: GruposComponent,  canActivate: [AuthGuard] },
  { path: 'grupo/:id', component: GrupoComponent,  canActivate: [AuthGuard] },
  { path: 'comunidades', component: VecindariosComponent,  canActivate: [AuthGuard] },
  // { path: 'agregar-vecindario', component: AgregarVecindarioComponent,  canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent,  canActivate: [AuthGuard] },


  // components routes - Autenticacion
  // { path: 'registro', component: RegistroComponent, data: {  active: false, icon: 'person_add', text: 'Crear Cuenta', section: ingreso }, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, data: {  active: false, icon: 'person_add', text: 'Crear Cuenta', section: ingreso }, canActivate: [LoginGuard] },
  // { path: 'registro/:id', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'iniciosesion', component: InisesComponent, data: {  active: false, icon: 'person', text: 'Iniciar Sesi??n', section: ingreso }, canActivate: [LoginGuard] },
  { path: 'recuperarcont', component: RecuperarcontComponent, data: {  active: false, icon: 'lock', text: 'Reestablecer Contrase??a', section: ingreso }, canActivate: [LoginGuard] },
  
  //Secciones
  { path: 'perfil', component: PerfilComponent, data: {  active: false, icon: 'person', text: 'Perfil', section: secciones },  canActivate: [AuthGuard] },
  // { path: 'publicar', component: PublicarComponent, data: {  active: false, icon: 'mode_edit', text: 'Publicar', section: secciones }, canActivate: [AuthGuard,PerfilGuard] },
  // { path: 'mispublicaciones/:id', component: MispublicacionesComponent, data: {  active: false, icon: 'list', text: 'Publicaciones', section: secciones },  canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' },
];
