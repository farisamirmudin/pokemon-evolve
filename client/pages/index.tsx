import { ConnectWallet, useAddress, useClaimedNFTs, useContract, useOwnedNFTs, Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { contract } = useContract("0x1184f186FfF1D4C360039848e67ECE863805573C");
  const address = useAddress();
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon Evolve</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to PokemonEvolve!
        </h1>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div>
          {isLoading ? "Loading..." : ownedNFTs?.map(nft =>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <p className={styles.supply}>{nft.supply}</p>
              <Image key={nft.metadata.id} style={{ width: 200, height: 200 }} src={nft.metadata.image!} alt="" width={500} height={500} />
            </div>
          )}
        </div>

        <div>
          <Web3Button
            contractAddress="0x1184f186FfF1D4C360039848e67ECE863805573C"
            action={(contract) => {
              contract.call("claim", address, 0, 1);
            }}
          >
            Claim
          </Web3Button>

          <Web3Button
            contractAddress="0x1184f186FfF1D4C360039848e67ECE863805573C"
            action={(contract) => {
              contract.call("evolve", 0)
            }}
          >
            Evolve (first stage)
          </Web3Button>
          <Web3Button
            contractAddress="0x1184f186FfF1D4C360039848e67ECE863805573C"
            action={(contract) => {
              contract.call("evolve", 1)
            }}
          >
            Evolve (second stage)
          </Web3Button>
        </div>

      </main>
    </div>
  );
};

export default Home;
