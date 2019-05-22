import React from 'react';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { baseUrl, apiKey } from '../enviroment';
import Axios from 'axios';
import { Match } from '../models/match'

interface Props {
    accountId: string;
    containerType: string;
}

interface State {
    accountId: string;
    jsonData: any;
    containerType: string;
    matches?: Match[];
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
    public componentDidUpdate(prevProps: Props, prevState: State, snapShot: any) {
        if (prevProps.accountId !== this.props.accountId) {
            this.getMatchHst(this.props.accountId);
        }
    }
    render() {
        return (
            <div>
                {this.state.matches ? (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Champion</TableCell>
                                <TableCell align="right">Warteschlange</TableCell>
                                <TableCell align="right">Datum</TableCell>
                                <TableCell align="right">Rolle</TableCell>
                                <TableCell align="right">Lane</TableCell>
                                <TableCell align="right">Spielstand</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.matches.map((f) => {
                                    return (
                                        <TableRow key={f.gameId}>
                                            <TableCell component="th" scope="row">{f.champion}</TableCell>
                                            <TableCell align="right">{f.queue}</TableCell>
                                            <TableCell align="right">{f.timestamp}</TableCell>
                                            <TableCell align="right">{f.role}</TableCell>
                                            <TableCell align="right">{f.lane}</TableCell>
                                            <TableCell align="right">{f.winstatus}</TableCell>
                                        </TableRow>
                                    )
                                }
                                )
                            }
                        </TableBody>
                    </Table>
                ) : null}

            </div>
        )
    }
    private getMatchHst(accountID: string) {
        const url = `${baseUrl}/match/v4/matchlists/by-account/${accountID}?endIndex=10&api_key=${apiKey}`;
        let newMatches: Match[];
        Axios.get(url)
            .then(response => {
                const matches = response.data.matches.map((match: Match) => {

                    return {
                        gameId: match.gameId,
                        champion: match.champion, queue: match.queue, timestamp: match.timestamp, role: match.role, lane: match.lane
                    };
                });

                this.setState({ ...this.state, matches });
                //this.checkMatchWin(matches)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    private checkMatchWin(matches: Match[]) {
        const newMatches = matches.map((match: Match) => {
            const url = `${baseUrl}/match/v4/matches/${match.gameId}?api_key=${apiKey}`;
            let result: any;
            let participantId = '';
            let gameResult = '';
            Axios.get(url)
                .then(response => {
                    result = response.data;
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
                    return {...match, winstatus: gameResult}
                    //this.setState({ ...this.state, winStatus: gameResult });
                })
                .catch(function (error) {
                    console.log(error);
                    return null;
                });
        });
        //this.setState({...this.state, matches: newMatches});
    }
}
export default containerHst;