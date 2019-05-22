import React from 'react';
import { baseUrl, apiKey } from '../enviroment';
import Axios from 'axios';
import containerHst from './containerHst';

interface Props {
    accountId: string;
    matchCount: number;
}

interface State {
    accountId: string;
    jsonData: any;
    matchCount: number;
    winRate: number;
}

class calculateRte extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.calculateWinRate = this.calculateWinRate.bind(this);
        this.checkMatchWin = this.checkMatchWin.bind(this);


        this.state = {
            accountId: this.props.accountId,
            jsonData: null,
            matchCount: this.props.matchCount,
            winRate: 0
        }
    }
    render() {
        return (
            <div>
                {this.calculateWinRate}
            </div>
        )
    }
    private calculateWinRate() {
        const url = `${baseUrl}/match/v4/matchlists/by-account/${this.state.accountId}?endIndex=${this.state.matchCount}&api_key=${apiKey}`;
        let countWonGames: number = 0;
        let countTotalGames: number = 0;

        Axios.get(url)
            .then(response => {
                this.setState({ ...this.state, jsonData: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });

        this.state.jsonData.matches.forEach((match: any) => {
            const isWin = this.checkMatchWin(match.gameId)
            if (isWin) {
                countWonGames += 1;
                countTotalGames += 1;
            } else {
                countTotalGames += 1;
            }
        });
        const newWinRate = 100/countTotalGames*countWonGames;
        const newState = {...this.state, winRate: newWinRate}
        this.setState(newState);
    }
    private checkMatchWin(matchId: string) {
        const url = `${baseUrl}/match/v4/matches/${matchId}?api_key=${apiKey}`;
        let result: any;
        let participantId = '';
        let gameResult: boolean = false;
        Axios.get(url)
            .then(response => {
                result = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        result.participantIdentities.forEach((participantIdentitie: any) => {
            if (participantIdentitie.player === this.state.accountId) {
                participantId = participantIdentitie.participantId;
            }
        });

        result.participants.forEach((participant: any) => {
            if (participant.participantId === participantId) {
                if (participant.stats.win) {
                    gameResult = true;
                } else {
                    gameResult = false;
                }
            }
        });

        return gameResult;
    }
}
export default calculateRte;