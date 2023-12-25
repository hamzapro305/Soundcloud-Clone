const TestServer = async () => {
    const resp = await fetch("https://jsonplaceholder.typicode.com/photos");
    const json = await resp.json();

    return (
        <div>
            {json.map((x: any) => (
                <div>{x?.title}</div>
            ))}
        </div>
    );
};

export default TestServer;
