function controller(options?: any) {
  console.log('options', options);
  return function (target: any) {
    // Aquí puedes usar el objeto options para personalizar el comportamiento del decorador
    console.log(`Decorator options: ${JSON.stringify(options)}`);

    const originalMethod = target.prototype.constructor;

    target.prototype.constructor = function (...args: any[]) {
      const instance = new originalMethod(...args);
  
      const methodNames = Object.getOwnPropertyNames(target.prototype);
  
      methodNames.forEach((methodName) => {
        const originalMethod = instance[methodName];
  
        instance[methodName] = function (...args: any[]) {
          console.log(`Method ${methodName} called with arguments: ${args}`);
          return originalMethod.apply(this, args);
        };
      });
  
      return instance;
    };
  };
}

// function controller(target: any) {
//   const originalMethod = target.prototype.constructor;

//   target.prototype.constructor = function (...args: any[]) {
//     const instance = new originalMethod(...args);

//     const methodNames = Object.getOwnPropertyNames(target.prototype);

//     methodNames.forEach((methodName) => {
//       const originalMethod = instance[methodName];

//       instance[methodName] = function (...args: any[]) {
//         console.log(`Method ${methodName} called with arguments: ${args}`);
//         return originalMethod.apply(this, args);
//       };
//     });

//     return instance;
//   };
// };

export {
  controller
};