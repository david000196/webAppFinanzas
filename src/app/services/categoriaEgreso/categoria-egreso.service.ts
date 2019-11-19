import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoriaEgreso } from 'src/app/models/categoriaEgreso/categoria-egreso';
import { CategoriaEgresoViewModel } from 'src/app/models/categoriaEgreso/categoria-egreso-view-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEgresoService {
  constructor(private db: AngularFirestore) { }

  private CategoriaEgresoCollectionName = 'categoriaEgresos';

  getCategoriaEgresos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<CategoriaEgreso>(this.CategoriaEgresoCollectionName, ref => ref.orderBy('nombre', 'desc')).get();
  }
  saveCategoriaEgreso(categoriaEgreso: CategoriaEgreso): Promise<DocumentReference> {
    return this.db.collection(this.CategoriaEgresoCollectionName).add(categoriaEgreso);
  }
  editCategoriaEgreso(categoriaEgreso: CategoriaEgresoViewModel): Promise<void> {
    return this.db.collection(this.CategoriaEgresoCollectionName).doc(categoriaEgreso.id).update(categoriaEgreso);

  }
  editCategoriaEgresoPartial(id: string, obj: Object): Promise<void> {
    return this.db.collection(this.CategoriaEgresoCollectionName).doc(id).update(obj);
  }
  deleteCategoriaEgreso(idCategoriaEgreso: string): Promise<void> {
    return this.db.collection(this.CategoriaEgresoCollectionName).doc(idCategoriaEgreso).delete();
  }
}
