// autobind decorator
export function Autobind(_: any, _2: string, descripter: PropertyDescriptor) {
  const originalmethod = descripter.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      const boundFn = originalmethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
