// import firebase from 'firebase';
// import Cliente from "../../src/core/Cliente";
// import ClienteRepositorio from "../../src/core/ClienteRepositorio";

// export default class ColecaoCliente implements ClienteRepositorio {

//     #conversor = {
//         toFirestore(cliente: Cliente) {
//             return {
//                 nome: cliente.nome,
//                 idade: cliente.idade,
//             }
//         },
//         fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
//             const dados = snapshot.data(options)
//             return new Cliente(dados.nome, dados.idade, snapshot.id)
//         }
//     }

//     async salvar(cliente: Cliente): Promise<Cliente> {
//         if(cliente?.id) {
//             await this.colecao().doc(cliente.id).set(cliente)
//             return cliente
//         } else {
//             const docRef = await this.colecao().add(cliente)
//             const doc = await docRef.get()
//             return doc.data()
//         }
//     }

//     async excluir(cliente: Cliente): Promise<void> {
//         return this.colecao().doc(cliente.id).delete()
//     }
//     async obterTodos(): Promise<Cliente[]> {
//         const query = await this.colecao().get()
//         return query.docs.map(doc => doc.data()) ?? []
//     }

//     private colecao() {
//         return firebase
//         .firestore().collection('clientes')
//         .withConverter(this.#conversor)
//     }
// }


import { dataBase } from '../config'
import firestore, {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import Cliente from '../../src/core/Cliente'
import ClienteRepositorio from '../../src/core/ClienteRepositorio'
 
export default class ColecaoCliente implements ClienteRepositorio {
 
  #conversor = {
    toFirestore: (cliente: Cliente) => {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      }
    },
    fromFirestore: (
      snapshot: firestore.QueryDocumentSnapshot,
      options: firestore.SnapshotOptions,
      ) => {
        const dados = snapshot.data(options)
        return new Cliente(dados.nome, dados.idade, snapshot.id)
      },
    }
    
  #colecaoCliente = collection(dataBase, 'clientes').withConverter(this.#conversor)
 
  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await setDoc(
        doc(dataBase, 'clientes', cliente.id).withConverter(this.#conversor),
        cliente,
      )
      return cliente
    } else {
      const docRef = await addDoc(
        this.#colecaoCliente,
        cliente,
      )
      const doc = await getDoc(docRef)
      return doc.data()
    }
  }
 
  async excluir(cliente: Cliente): Promise<void> {
    return await deleteDoc(doc(dataBase, 'clientes', cliente.id))
  }
 
  async obterTodos(): Promise<Cliente[]> {
    const clientesCol = this.#colecaoCliente
    const clientesSnapshot = await getDocs(clientesCol)
    const clientesList = clientesSnapshot.docs.map((doc) => doc.data()) ?? []
    return clientesList
  }
}