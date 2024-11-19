import { SCP, Key } from '@secretarium/connector';
// import * as fs from 'fs';

type MyValue = {
    success: boolean;
    value: string;
}
 
async function main() {
    try {
        const scp = new SCP();

        //In case you do not have a key and don't mind not having one, then just create as follows
        const myKey = await Key.createKey();

        //Otherwise, if you just want to use a specific key, you can import it as follows
        // const KLAVE_CONNECTION_KEYPAIR = './config/connectionKeys/key1.secretarium';        
        // const encryptedKey = fs.readFileSync(KLAVE_CONNECTION_KEYPAIR);  
        // const myKey = await Key.importKey(JSON.parse(encryptedKey.toString()));

        //Note that the file key1.secretarium should look like this:
        // {
        //     "version":2,
        //     "publicKey":
        //     {
        //         "crv":"P-256",
        //         "ext":true,
        //         "key_ops":["verify"],
        //         "kty":"EC",
        //         "x":"aaaaaaaaaaaaa",
        //         "y":"bbbbbbbbbbbbb"
        //     },
        //     "privateKey":
        //     {
        //         "crv":"P-256",
        //         "d":"cccccccccccccc",
        //         "ext":true,
        //         "key_ops":["sign"],
        //         "kty":"EC",
        //         "x":"aaaaaaaaaaaaaa",
        //         "y":"bbbbbbbbbbbbbb"
        //     },
        //     "name":"testKey"
        // }

        console.log('\n>> Opening SCP...');

        //Customize the URL to your own network
        let result = await scp.connect('wss://on-my-klave-network/', myKey);
     
        //Customize the AppId to your own application
        const myAppId = '1234567.myapp.klave.network';
     
        // We load data in our application ledger with a transaction
        console.log('\n>> Write Data...');        
        let tx = {
            "dcapp": myAppId,
            "function":"storeValue",
            "args": { key: 'myKey', value: 'myValue12345' }
        };    
        result = await scp.newTx(tx.dcapp, tx.function, 'requestId1', tx.args).send()
     
        // We retreive the data with a query
        console.log('\n>> Load Data...');        
        let query = {
            "dcapp": myAppId,
            "function":"fetchValue",
            "args": { key: 'myKey' }
        };
        let resultQuery = await scp.newQuery<MyValue>(query.dcapp, query.function, 'requestId2', query.args).send()
     
        // We display the data we retreive and see it matches
        console.log(resultQuery); // { "success": true, "value": "myValue" }    

        console.log('\n>> Finished...');        
    }
    catch (error) {
        console.error(error);
    }
}
 
main()
