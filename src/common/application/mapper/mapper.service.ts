import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
  dtoToClass<T>(dtoObject: any, classObject: T): T {
    for (const property in dtoObject) {
      if (
        dtoObject.hasOwnProperty(property) &&
        typeof dtoObject[property] !== 'function'
      ) {
        classObject[property] = dtoObject[property];
      }
    }

    return classObject;
  }
  classToEntity<T>(classInstance: T, entity: any): any {
    const classKeys = Object.keys(classInstance);

    classKeys.forEach((key) => {
      if (typeof classInstance[key] !== 'function') {
        entity[key] = classInstance[key];
      }
    });

    return entity;
  }

  entityToClass<T>(entityObject: any, classObject: T): T {
    for (const property in entityObject) {
      if (
        entityObject.hasOwnProperty(property) &&
        typeof entityObject[property] !== 'function'
      ) {
        classObject[property] = entityObject[property];
      }
    }

    return classObject;
  }
}
