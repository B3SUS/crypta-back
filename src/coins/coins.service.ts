import { Injectable } from '@nestjs/common';
import axios from "axios";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

@Injectable()
export class CoinsService {

    private readonly neededCoins = [
        'bitcoin',
        'ethereum',
        'tether',
        'binance-coin',
        'solana',
        'usd-coin',
        'xrp',
        'dogecoin',
        'shiba-inu',
        'cardano',
        'avalanche',
        'tron',
        'polkadot',
        'near-protocol',
        'litecoin',
        'monero'
    ];

    private readonly neededRates = [

    ];


    constructor(private readonly httpService: HttpService) {}

    async getCoins(): Promise<any> {
        const apiUrl = `https://api.coincap.io/v2/assets/?ids=${this.neededCoins.join(',')}`;
        try {
            console.log('Fetching coins data from:', apiUrl);
            const coinsResponse = await firstValueFrom(this.httpService.get(apiUrl));
            console.log('Coins response data:', coinsResponse.data);  // Логируем весь ответ

            const coinDataPromises = this.neededRates.map((coin) => {
                const apiUrl = `https://api.coincap.io/v2/rates/${coin}`;
                console.log('Fetching rates data from:', apiUrl);
                return firstValueFrom(this.httpService.get(apiUrl));
            });

            const responses = await Promise.all(coinDataPromises);
            console.log('Rates responses:', responses);

            const ratesResponse = responses.map(response => response.data.data);

            const updatedCoinsResponse = coinsResponse.data.data.map(({rank, supply, maxSupply, marketCapUsd, volumeUsd24Hr, changePercent24Hr, vwap24Hr, explorer, id, symbol, name, priceUsd}) => ({
                id: id,
                symbol: symbol,
                name: name,
                priceUsd: priceUsd,
                type: 'coin'
            }));

            const updatedRatesResponse = ratesResponse.map(({symbol, currencySymbol, rateUsd, id, type}) => ({
                id: id,
                symbol: symbol,
                name: 'Фиат ' + symbol,
                priceUsd: rateUsd,
                type: type
            }));

            return updatedCoinsResponse.concat(updatedRatesResponse);
        } catch (error) {
            console.error('Error in getCoins method:', error);  // Логируем ошибку
            throw new Error('Error fetching coins data: ' + error.message);
        }
    }

}
