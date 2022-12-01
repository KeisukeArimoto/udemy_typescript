export function Autobind(_, _2, descripter) {
    const originalmethod = descripter.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFn = originalmethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
//# sourceMappingURL=autobind.js.map