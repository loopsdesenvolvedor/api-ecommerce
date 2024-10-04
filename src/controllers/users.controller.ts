import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

type User = { id: number; nome: string; email: string };

class UserController {
  static async getAll(req: Request, res: Response) {
    const snapshot = await getFirestore().collection("users").get();
    const users = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    res.send(users);
  }

  static async getById(req: Request, res: Response) {
    let userId = req.params.id;
    const doc = await getFirestore().collection("users").doc(userId).get();
    res.send({
      id: doc.id,
      ...doc.data(),
    });
  }

  static async save(req: Request, res: Response) {
    let user = req.body;
    const userSave = await getFirestore().collection("users").add(user);
    res.send({
      message: `Usuário ${userSave.id} criado com sucesso! `,
    });
  }

  static update(req: Request, res: Response) {
    let userId = req.params.id;
    let user = req.body as User;

    getFirestore().collection("users").doc(userId).set({
      nome: user.nome,
      email: user.email,
    });

    res.send({
      message: "Usuario aletrado com sucesso!",
    });
  }

  static async delete(req: Request, res: Response) {
    let userId = req.params.id;

    await getFirestore().collection("users").doc(userId).delete();

    res.send({
      message: "Usuario excluido com sucesso!",
    });
  }
}

export default UserController;
