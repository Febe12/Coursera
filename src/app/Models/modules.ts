export interface Modules {
    _id:string;
    title:string;
    duration:string;
    topics:{
      _id: string,
                    title: string,
                    description:string
    }[];
      createdAt: Date;
  updatedAt: Date;
}
