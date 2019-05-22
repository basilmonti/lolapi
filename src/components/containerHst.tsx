import React from 'react';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { baseUrl, apiKey } from '../enviroment';
import Axios from 'axios';

interface Props {
    accountId: string;
    containerType: string;
}

interface State {
    accountId: string;
    jsonData: any;
    containerType: string;
}

class containerHst extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);


        this.getMatchHst = this.getMatchHst.bind(this);
        this.checkMatchWin = this.checkMatchWin.bind(this);

        this.state = {
            accountId: this.props.accountId,
            jsonData: null,
            containerType: this.props.containerType
        }
    }
    public componantDidUpdate(prevProps: Props, prevState: State)
    {
        let newState;
        if (prevProps.accountId !== null) {
            this.getMatchHst();
            newState = {...prevState, jsonData: this.state.jsonData}
        }else{
            //Continue
        }
        return newState;//Neuer State zurückgeben
    }
    render() {
        return (
            <div>
                {this.state.jsonData ? (
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Test1</TableCell>
                            <TableCell align="right">Test1</TableCell>
                            <TableCell align="right">Test1</TableCell>
                            <TableCell align="right">Test1</TableCell>
                            <TableCell align="right">Test1</TableCell>
                            <TableCell align="right">Test1</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.jsonData.map((f:any) => {
                                return (
                                    <TableRow key={this.state.jsonData.indexOf(f)}>
                                        <TableCell component="th" scope="row">{f.champion}</TableCell>
                                        <TableCell align="right">{f.queue}</TableCell>
                                        <TableCell align="right">{f.timestamp}</TableCell>
                                        <TableCell align="right">{f.role}</TableCell>
                                        <TableCell align="right">{f.lane}</TableCell>
                                        <TableCell align="right">{this.checkMatchWin(f.gameId)}</TableCell>
                                    </TableRow>
                                )
                            }
                            )
                        }
                    </TableBody>
                </Table>
                ) : null }
                
            </div>
        )
    }
    private getMatchHst() {
        const url = `${baseUrl}/match/v4/matchlists/by-account/${this.state.accountId}?endIndex=10&api_key=${apiKey}`;
        let resultData: any;

        Axios.get(url)
            .then(response => {
                resultData = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ ...this.state, jsonData: resultData });
    }
    private checkMatchWin(matchId: string) {
        const url = `${baseUrl}/match/v4/matches/${matchId}?api_key=${apiKey}`;
        let result: any;
        let participantId = '';
        let gameResult = '';
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
                    gameResult = 'Gewonnen!';
                } else {
                    gameResult = 'Verloren!'
                }
            }
        });

        return gameResult;
    }
}
export default containerHst;