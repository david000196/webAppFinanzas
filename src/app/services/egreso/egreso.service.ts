import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Egreso } from '../../models/egreso/egreso';
import { EgresoViewModel } from '../../models/egreso/egreso-view-model';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {
  constructor(private db: AngularFirestore) { }

  private egresoCollectionName = 'egresos';

  getEgresos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Egreso>(this.egresoCollectionName, ref => ref.orderBy('lastModifiedDate', 'desc')).get();
  }
  saveEgreso(egreso: Egreso): Promise<DocumentReference> {
    return this.db.collection(this.egresoCollectionName).add(egreso);
  }
  editEgreso(egreso: EgresoViewModel): Promise<void> {
    return this.db.collection(this.egresoCollectionName).doc(egreso.id).update(egreso);
  }
  editEgresoPartial(id: string, obj: Object): Promise<void> {
    return this.db.collection(this.egresoCollectionName).doc(id).update(obj);
  }
  deleteEgreso(idegreso: string): Promise<void> {
    return this.db.collection(this.egresoCollectionName).doc(idegreso).delete();
  }
}
