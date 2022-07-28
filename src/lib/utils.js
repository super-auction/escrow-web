const { ethers } = require('ethers')

const CONTRACT_ADDRESS = require('../config.json').CONTRACT_ADDRESS
const CONTRACT_ABI = require('../lib/contract/SuperEscrow.json').abi

function toEth(weiValue) { return ethers.utils.formatEther(weiValue) }
function toWei(ethValue) { return ethers.utils.parseEther(ethValue)}

const formatNumber = (bigNumFormat) => {
    if (bigNumFormat) {
        return toEth(bigNumFormat.toString())
    }
    return '';
}

const formatDate = (bigNumFormat) => {
    if (bigNumFormat) {
        return new Date(Number(bigNumFormat.toString())).toISOString()
    }
    return ''
}


module.exports = {
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    toEth,
    toWei,
    formatDate,
    formatNumber,
}
