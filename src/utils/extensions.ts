import { IMG_DUMMY } from "./constant";

export const validateImg = (str: string) => {
    var tarea: string = str;
    if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
      return tarea
    } else {
      return tarea = IMG_DUMMY
    }
  }