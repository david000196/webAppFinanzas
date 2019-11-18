import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Usuario } from 'src/app/models/usuario/usuario';
import { Observable } from 'rxjs';
import { UsuarioViewModel } from 'src/app/models/usuario/usuario-view-model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private db: AngularFirestore) { }

  private usuarioCollectionName = 'usuarios';
 
  getUsuarios(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Usuario>(this.usuarioCollectionName, ref => ref.orderBy('id', 'desc')).get();
  }
  saveUsuario(usuario: Usuario): Promise<DocumentReference> {
    return this.db.collection(this.usuarioCollectionName).add(usuario);
  }
  editUsuario(usuario: UsuarioViewModel): Promise<void>{
    return this.db.collection(this.usuarioCollectionName).doc(usuario.id).update(usuario);
  }
  editUsuarioPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.usuarioCollectionName).doc(id).update(obj);
  }
  deleteUsuario(idUsuario: string): Promise<void>{
    return this.db.collection(this.usuarioCollectionName).doc(idUsuario).delete();
  }
}