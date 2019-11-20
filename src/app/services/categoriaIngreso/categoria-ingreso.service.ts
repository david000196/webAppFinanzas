import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ClasificacionIngreso } from 'src/app/models/categoriaIngreso/categoria-ingreso';
import { ClasificacionIngresoViewModel } from 'src/app/models/categoriaIngreso/categoria-ingreso-view-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaIngresoService {
  constructor(private db: AngularFirestore) { }

  private CategoriaIngresoCollectionName = 'categoriaIngresos';

  getCategoriaIngresos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<ClasificacionIngreso>(this.CategoriaIngresoCollectionName, ref => ref.orderBy('nombre', 'desc')).get();
  }
  saveCategoriaIngreso(categoriaIngreso: ClasificacionIngreso): Promise<DocumentReference> {
    return this.db.collection(this.CategoriaIngresoCollectionName).add(categoriaIngreso);
  }
  editCategoriaIngreso(categoriaIngreso: ClasificacionIngresoViewModel): Promise<void> {
    return this.db.collection(this.CategoriaIngresoCollectionName).doc(categoriaIngreso.id).update(categoriaIngreso);
  }
  editCategoriaIngresoPartial(id: string, obj: Object): Promise<void> {
    return this.db.collection(this.CategoriaIngresoCollectionName).doc(id).update(obj);
  }
  deleteCategoriaIngreso(idCategoriaIngreso: string): Promise<void> {
    return this.db.collection(this.CategoriaIngresoCollectionName).doc(idCategoriaIngreso).delete();
  }
}
