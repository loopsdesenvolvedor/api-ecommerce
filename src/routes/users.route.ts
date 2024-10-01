import { Router, Request, Response } from "express";
const userRouter = Router();

type User = { id: number; nome: string; email: string };

let id = 0;

let usuarios: User[] = [];

userRouter.get("/users", (req: Request, res: Response) => {
  res.json(usuarios);
});

userRouter.get("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id);
  let user = usuarios.find((user) => (user.id = userId));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: "Usuário não encontrado" });
  }
});

userRouter.post("/users", (req: Request, res: Response) => {
  let user = req.body;
  user.id = ++id;
  usuarios.push(user);
  res.send({
    message: "Usuário cadastrado com sucesso!",
  });
});

userRouter.put("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id);
  let user = req.body;
  let indexOF = usuarios.findIndex((_user: User) => _user.id === userId);
  usuarios[indexOF].nome = user.nome;
  usuarios[indexOF].email = user.email;

  res.send({
    message: "Usuario aletrado com sucesso!",
  });
});

userRouter.delete("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id);
  let indexOf = usuarios.findIndex((user: User) => user.id === userId);
  usuarios.splice(indexOf, 1);
  res.send({
    message: "Usuario excluido com sucesso!",
  });
});

export default userRouter;
