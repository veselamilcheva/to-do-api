import db from '../db/db';
let insertId;

afterAll(() => {
    db.end()
})

describe('db for to dos', () => {

    it('creates to dos', async () => {
        const data = await db.postTodo({
            title: 'a',
            description: 'b'
        })
        expect(data).toHaveProperty('insertId');
        insertId = data.insertId;
        expect(insertId).toBeTruthy();
    });
    
    it('returns bulk to dos', async () => {
        const data = await db.getTodos();
        expect(data[0].id).toBeDefined(); //for advanced toMatchSchema
        expect(data[0].title).toBeDefined();
        expect(data[0].description).toBeDefined();
        expect(data.length).toBeTruthy();
    });
    
    it('updates to do', async () => {
        const todo = {
            id: insertId,
            title: 'a',
            description: 'b'
        }
        const data = await db.putTodo(todo);
        expect(data.affectedRows).toEqual(1); // changed one row for sure
        expect(data).toBeTruthy();
    });
    
    it('deletes to do', async () => {
        const data = await db.deleteTodo(insertId);
        expect(data.affectedRows).toEqual(1);
        expect(data).toBeTruthy();
        const checkId = await db.getTodo(insertId);
        expect(checkId.length).toEqual(0);
    });

})