import { ethers } from "ethers";
import { createContext } from "react";
import { contractABI, contractAddress } from "../utils/connect";

//contextを作るときは、頭文字大文字で始めるのが通常
//"react"にあるcontextを呼んでくる。そうするとcontextを作ることができる
export const TransactionContext = createContext();

//スマートコントラクトの取得 ※自動契約プログラム
//window.ethereumはインストールしたメタマスクの情報を見ることができるもの
const getSmartContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //ユーザーのメタマスク情報を署名により取得する/署名をもとにコントラクトにアクセス
    const signer = provider.getSigner();
    //
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    console.log(provider, signer, transactionContract);

    return transactionContract;
};


//作成したコンテキストをどのプロバイダでも使えるようにしていきたいので、
//「TransactionProvider（提供する）」を作成
//TransactionProviderの中に、ウォレット連携、通貨のやり取りなどをする関数を記述する
//記述したプロバイダは、どのコンポーネントにも渡せるように記述する
export const TransactionProvider = ({ children }) => {
    

    return (
    //ここで囲まれた{children}はTransactionContextで宣言された変数・関数をいつでも呼び出すことができる。
    //どんな変数を渡したいかは「value」で指定することができる。
    //下記のようにすることで、この{{ name: "dd1107" }}プロパティの情報は
    // childrenでいつでも使うことができる
      <TransactionContext.Provider value={{ name: "dd1107" }}>
        {children}
      </TransactionContext.Provider>
    );
}