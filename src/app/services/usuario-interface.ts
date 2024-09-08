export interface IRequestLogin {
    usuario: string;
    contraseña: string;
    tareas: TareaDtoResponse[];
  }
  
  export interface TareaDtoResponse {
    tareaId: number;
    descripcion: string;
    completed: boolean;
    usuarioId: number;
    fechaCreacion: Date;
    fechaVencimiento: Date;
    prioridad?: string;
    estado?: string;
  }