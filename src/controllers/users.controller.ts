import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

type User = { id: number; nome: string; email: string };

let usuarios: User[] = [];

class UserController {
  static getAll(req: Request, res: Response) {
    res.send(usuarios);
  }

  static getById(req: Request, res: Response) {
    let userId = Number(req.params.id);
    let user = usuarios.find((user) => (user.id = userId));
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: "Usuário não encontrado" });
    }
  }

  static async save(req: Request, res: Response) {
    let user = req.body;
    const userSave = await getFirestore().collection("users").add(user);
    res.send({
      message: `Usuário ${userSave.id} criado com sucesso! `,
    });
  }

  static update(req: Request, res: Response) {
    let userId = Number(req.params.id);
    let user = req.body;
    let indexOF = usuarios.findIndex((_user: User) => _user.id === userId);
    usuarios[indexOF].nome = user.nome;
    usuarios[indexOF].email = user.email;

    res.send({
      message: "Usuario aletrado com sucesso!",
    });
  }

  static delete(req: Request, res: Response) {
    let userId = Number(req.params.id);
    let indexOf = usuarios.findIndex((user: User) => user.id === userId);
    usuarios.splice(indexOf, 1);
    res.send({
      message: "Usuario excluido com sucesso!",
    });
  }
}

export default UserController;
