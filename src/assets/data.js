export const fetchPostsApi = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const initialData = [
                {
                    "id": 1,
                    "title": "Tesla",
                    "text": "Best company",
                    "currentLikes": 7,
                    "createdAt": 1737014400000, 
                    "comments": [
                        { "id": "c101", "author": "Elon", "text": "Yes!!!!", "likes": 5, "createdAt": 1737016200000 },
                        { "id": "c102", "author": "User123", "text": "Totally agree", "likes": 1, "createdAt": 1737018000000 }
                    ]
                },
                {
                    "id": 2,
                    "title": "VK",
                    "text": "Messenger for children",
                    "currentLikes": 2,
                    "createdAt": 1741795200000, 
                    "comments": [
                        { "id": "c201", "author": "Pavel", "text": "Ok:)", "likes": 12, "createdAt": 1741797900000 }
                    ]
                },
                {
                    "id": 3,
                    "title": "Me",
                    "text": "Best student",
                    "currentLikes": 999,
                    "createdAt": 1746460800000, 
                    "comments": [
                        { "id": "c301", "author": "Teacher", "text": "Nice!", "likes": 20, "createdAt": 1746461400000 },
                        { "id": "c302", "author": "Mom", "text": "My best boy!", "likes": 50, "createdAt": 1746464400000 },
                        { "id": "c303", "author": "Classmate", "text": "Wow", "likes": 0, "createdAt": 1746465300000 }
                    ]
                },
                {
                    "id": 4,
                    "title": "Item",
                    "text": "Some other item",
                    "currentLikes": 0,
                    "createdAt": 1755776400000,
                    "comments": []
                },
                {
                    "id": 5,
                    "title": "Real article",
                    "text": "Real text for real article",
                    "currentLikes": 11,
                    "createdAt": 1759424400000,
                    "comments": []
                }
            ];
            resolve(initialData);
        }, 500);
    });
};