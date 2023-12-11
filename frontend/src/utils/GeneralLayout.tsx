const GeneralLayout = (cb: (children: React.ReactNode) => React.ReactNode) => {
    const layout = ({ children }: { children: React.ReactNode }) => {
        return cb(children);
    };
    return layout;
};

export default GeneralLayout
