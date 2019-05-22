import { Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Axios from "axios";
import React from "react";
import { apiKey, baseUrl } from "../enviroment";
import { IMatch } from "../models/match";

interface IProps {
    accountId: string;
    containerType: string;
}

interface IState {
    accountId: string;
    jsonData: any;
    containerType: string;
    matches?: IMatch[];
}

class ContainerHst extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.getMatchHst = this.getMatchHst.bind(this);
        this.checkMatchWin = this.checkMatchWin.bind(this);

        this.state = {
            accountId: this.props.accountId,
            containerType: this.props.containerType,
            jsonData: null,
        };
    }
    public componentDidUpdate(prevProps: IProps, prevState: IState, snapShot: any) {
        if (prevProps.accountId !== this.props.accountId) {
            this.getMatchHst(this.props.accountId);
        }
    }
    public render() {
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
                                    );
                                },
                                )
                            }
                        </TableBody>
                    </Table>
                ) : null}

            </div>
        );
    }
    private getMatchHst(accountID: string) {
        const url = `${baseUrl}/match/v4/matchlists/by-account/${accountID}?endIndex=10&api_key=${apiKey}`;
        // const newMatches: Match[];
        Axios.get(url)
            .then((response) => {
                const matches = response.data.matches.map((match: IMatch) => {

                    return {
                        champion: match.champion,
                        gameId: match.gameId,
                        lane: match.lane,
                        queue: match.queue,
                        role: match.role,
                        timestamp: match.timestamp,
                    };
                });

                this.setState({ ...this.state, matches });
                // this.checkMatchWin(matches)
            })
            // tslint:disable-next-line:only-arrow-functions
            .catch(function(error) {
                // console.log(error);
            });
    }
    private checkMatchWin(matches: IMatch[]) {
        const newMatches = matches.map((match: IMatch) => {
            const url = `${baseUrl}/match/v4/matches/${match.gameId}?api_key=${apiKey}`;
            let result: any;
            let participantId = "";
            let gameResult = "";
            Axios.get(url)
                .then((response) => {
                    result = response.data;
                    result.participantIdentities.forEach((participantIdentitie: any) => {
                        if (participantIdentitie.player === this.state.accountId) {
                            participantId = participantIdentitie.participantId;
                        }
                    });

                    result.participants.forEach((participant: any) => {
                        if (participant.participantId === participantId) {
                            if (participant.stats.win) {
                                gameResult = "Gewonnen!";
                            } else {
                                gameResult = "Verloren!";
                            }
                        }
                    });
                    return { ...match, winstatus: gameResult };
                    // this.setState({ ...this.state, winStatus: gameResult });
                })
                // tslint:disable-next-line:only-arrow-functions
                .catch(function(error) {
                    // console.log(error);
                    return null;
                });
        });
        // this.setState({...this.state, matches: newMatches});
    }
}
export default ContainerHst;
