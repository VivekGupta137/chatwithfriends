const ChatItem = () => {
    return (
        <div>
            <div className="flex flex-col border-2 border-blue-500 p-2">
                <div className="flex items-center">
                    <img
                        src="/images/user.png"
                        alt="User"
                        className="w-10 h-10 rounded-full mr-2"
                    />
                    <h1 className="text-lg font-semibold">User Name</h1>
                </div>
                <p className="text-gray-600">
                    Last message content goes here...
                </p>
            </div>
        </div>
    );
};

export default ChatItem;
