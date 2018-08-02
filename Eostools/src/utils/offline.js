import eoslib from 'eosjs'
import config from './config'
import BigNumber from 'bignumber.js'
const httpEndpoint = null
// const chainId = process.env.NODE_ENV !== 'production' ? config.node.Eosio.TestNet.chainId : config.node.Eosio.MainNet.chainId
const chainId = config.node.Eosio.MainNet.chainId
const coin = 'EOS'
const rate = 1e4

export const getEos = async (jsonInfo, keyProvider) => {
  const transactionHeaders = JSON.parse(jsonInfo)
  const eos = eoslib({
    httpEndpoint,
    chainId,
    keyProvider,
    transactionHeaders
  })
  return eos
}

export const isKeyValid = async (key) => {
  return eoslib.modules.ecc.isValidPrivate(key)
}

export const createKey = async () => {
  const privateKey = await eoslib.modules.ecc.randomKey()
  const publicKey = await eoslib.modules.ecc.privateToPublic(privateKey)
  return {privateKey, publicKey}
}

// const newAccount = async (jsonInfo, keyProvider, creatorName, newAccountName, newPublicKey) => {
//   const eos = await getEos(jsonInfo, keyProvider)
//   let transaction = await eos.newaccount({
//     creator: creatorName,
//     name: newAccountName,
//     owner: newPublicKey,
//     active: newPublicKey
//   }).then(tr => {
//     return tr.transaction
//   }).catch(err => {
//     console.log(err)
//   })
//   return JSON.stringify(transaction)
// }

export const transfer = async ({jsonInfo, keyProvider, fromAccountName, toAccountName, transferQuantity, transferMemo}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.transfer({
    from: fromAccountName,
    to: toAccountName,
    quantity: new BigNumber(transferQuantity).toFixed(Math.log10(rate)).toString() + ' ' + coin,
    memo: transferMemo || ''
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const voteProducer = async ({jsonInfo, keyProvider, voterAccountName, producers}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  producers.sort()
  const transaction = await eos.voteproducer({
    voter: voterAccountName,
    proxy: '',
    producers: producers
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const delegatebw = async ({jsonInfo, keyProvider, fromAccountName, receiverAccountName, netQuantity, cpuQuantity}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.delegatebw({
    from: fromAccountName,
    receiver: receiverAccountName,
    'stake_net_quantity': new BigNumber(netQuantity).toFixed(Math.log10(rate)).toString() + ' ' + coin,
    'stake_cpu_quantity': new BigNumber(cpuQuantity).toFixed(Math.log10(rate)).toString() + ' ' + coin,
    transfer: 0
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const unDelegatebw = async ({jsonInfo, keyProvider, fromAccountName, receiverAccountName, netQuantity, cpuQuantity}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.undelegatebw({
    from: fromAccountName,
    receiver: receiverAccountName,
    'unstake_net_quantity': new BigNumber(netQuantity).toFixed(Math.log10(rate)).toString() + ' ' + coin,
    'unstake_cpu_quantity': new BigNumber(cpuQuantity).toFixed(Math.log10(rate)).toString() + ' ' + coin
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const buyRam = async ({jsonInfo, keyProvider, payerAccountName, receiverAccountName, quantity}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.buyram({
    payer: payerAccountName,
    receiver: receiverAccountName,
    quant: new BigNumber(quantity).toFixed(Math.log10(rate)).toString() + ' ' + coin
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const buyRamBytes = async ({jsonInfo, keyProvider, payerAccountName, receiverAccountName, bytes}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.buyrambytes({
    payer: payerAccountName,
    receiver: receiverAccountName,
    bytes: Number(bytes)
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const sellRam = async ({jsonInfo, keyProvider, accountName, bytes}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.sellram({
    account: accountName,
    bytes: Number(bytes)
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const newAccount = async ({jsonInfo, keyProvider, creatorName, newAccountName, newOwnerKey, newActiveKey, netQuantity, cpuQuantity, bytes}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.transaction(tr => {
    tr.newaccount({
      creator: creatorName,
      name: newAccountName,
      owner: newOwnerKey,
      active: newActiveKey
    })

    tr.buyrambytes({
      payer: creatorName,
      receiver: newAccountName,
      bytes: Number(bytes)
    })

    tr.delegatebw({
      from: creatorName,
      receiver: newAccountName,
      stake_net_quantity: new BigNumber(netQuantity).toFixed(Math.log10(rate)).toString() + ' ' + coin,
      stake_cpu_quantity: new BigNumber(cpuQuantity).toFixed(Math.log10(rate)).toString() + ' ' + coin,
      transfer: 0
    })
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const refund = async ({jsonInfo, keyProvider, accountName}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.refund({
    owner: accountName
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const updateActiveKey = async ({jsonInfo, keyProvider, accountName, newPublicKey}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.updateauth({
    account: accountName,
    permission: 'active',
    parent: 'owner',
    auth: newPublicKey
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const updateOwnerKey = async ({jsonInfo, keyProvider, accountName, newPublicKey}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.transaction({
    actions: [
      {
        account: 'eosio',
        name: 'updateauth',
        authorization: [{
          actor: accountName,
          permission: 'owner'
        }],
        data: {
          account: accountName,
          permission: 'owner',
          parent: '',
          auth: newPublicKey
        }
      }
    ]
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}

export const proxy = async ({jsonInfo, keyProvider, voterAccountName, proxyAccountName}) => {
  const eos = await getEos(jsonInfo, keyProvider)
  const transaction = await eos.voteproducer({
    voter: voterAccountName,
    proxy: proxyAccountName,
    producers: []
  }).then(tr => {
    return tr.transaction
  }).catch(err => {
    console.log(err)
  })
  return JSON.stringify(transaction)
}
