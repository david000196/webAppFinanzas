import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingreso } from '../../models/Ingreso/Ingreso';
import { DocumentReference, AngularFirestore } from '@angular/fire/firestore';
import { IngresoViewModel } from '../../models/Ingreso/Ingreso-view-model';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(private db: AngularFirestore) { }

  private ingresoCollectionName = 'ingresos';
 
  getIngresos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Ingreso>(this.ingresoCollectionName, ref => ref.orderBy('fecha', 'desc')).get();
  }
  
  saveIngreso(ingreso: Ingreso): Promise<DocumentReference> {
    return this.db.collection(this.ingresoCollectionName).add(ingreso);
  }
  editIngreso(ingreso: IngresoViewModel): Promise<void>{
    return this.db.collection(this.ingresoCollectionName).doc(ingreso.id).update(ingreso);
  }
  editIngresoPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.ingresoCollectionName).doc(id).update(obj);
  }
  deleteIngreso(idIngreso: string): Promise<void>{
    return this.db.collection(this.ingresoCollectionName).doc(idIngreso).delete();
  }

  getIngresosAnio(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Ingreso>(this.ingresoCollectionName, ref => ref.where('categoriaIngreso','==','Ventas')).get();
  }
}
