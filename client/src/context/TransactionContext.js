import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/connect";

//contextを作るときは、頭文字大文字で始めるのが通常
//"react"にあるcontextを呼んでくる。そうするとcontextを作ることができる
export const TransactionContext = createContext();

const { ethereum } = window;

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

  //※１アカウントのログイン情報を保存しておくためにuseStateを使う
  const [currentAccount, setCurrentAccount] = useState("");

    //メタマスクウォレットと連携しているか確認
  const checkTransactionWalletConnected = async () => {
    if (!ethereum) return alert("メタマスクをインストールしてください");

    //メタマスクのアカウントIDを取得
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);

  };

  //メタマスクウォレットと連携する
  const connectWallet = async () => {
    if (!ethereum) return alert("メタマスクをインストールしてください");

    //メタマスクを持っていれば接続を開始する
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log(accounts[0]);

    //上の※１にログインしているアドレスを渡す
    setCurrentAccount(accounts[0]);
  }

  


  //useEffectの使い方。第二引数に依存環境を示し、その変数が実行されたときだけ、
  //指定の関数を読み込むようにする。今回は空なのでページリロード時一度だけ実行
  //ログインしているか確認するもの。ログインすれば[]にアドレスが入る
  useEffect(() => {
    checkTransactionWalletConnected();
  }, []);

  return (
    //ここで囲まれた{children}はTransactionContextで宣言された変数・関数をいつでも呼び出すことができる。
    //どんな変数を渡したいかは「value」で指定することができる。
    //下記のようにすることで、この{{ name: "dd1107" }}プロパティの情報は
    // childrenでいつでも使うことができる
    <TransactionContext.Provider value={{ connectWallet }}>
      {children}
    </TransactionContext.Provider>
  );
};