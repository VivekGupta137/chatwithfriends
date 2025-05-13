const LeftSideBar = () => {
    const friends = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
        { id: 4, name: "Bob Brown" },
        { id: 5, name: "Charlie Davis" },
    ];
    return (
        <div className="border-2 border-green-500 ">
            {friends.map((friend) => (
                <div
                    key={friend.id}
                    className="flex flex-col  border-b border-black p-2"
                >
                    <h1>{friend.name}</h1>
                    <p className="text-green-500 text-sm">impersonate ?</p>
                </div>
            ))}
        </div>
    );
};

export default LeftSideBar;
