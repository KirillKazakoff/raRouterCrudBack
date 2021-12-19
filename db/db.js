class Db {
    constructor() {
        this.data = [
            {
                username: 'Vasya',
                note: 'Hello There is some content1',
                id: '1',
                avatar: 'http://localhost:9000/img/user.png',
                time: '20:04',
            },
            {
                username: 'SomeName1',
                note: 'Hello There is some content2',
                id: '2',
                avatar: 'http://localhost:9000/img/user.png',
                time: '10:12',
            },
        ];
    }

    add(item) {
        this.data.push(item);
    }

    delete(id) {
        const index = this.data.findIndex((dbItem) => dbItem.id === id);

        if (index === -1) return;

        this.data.splice(index, 1);
    }
}

const db = new Db();
export default db;
