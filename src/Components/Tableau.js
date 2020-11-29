import { MyContext } from '../MyContext';
import TableauStack from './TableauStack';

export default function Tableau(props) {
    //@todo  use CSS for layout instead of html table
    return (
        <MyContext.Consumer>
            {ctx => <div>
                <table>
                    <tbody>
                        <tr>
                            {props.stacks.map((stack, index) => (
                                <td>
                                    <TableauStack
                                        stackIndex={index}
                                        stack={stack.stack}
                                        blinkFor={stack.blinkFor}
                                        onClick={(card, source) => ctx.onTableauStackClick(card, index, source)}
                                    /></td>))
                            }
                        </tr>
                    </tbody>
                </table>

            </div>
            }
        </MyContext.Consumer>
    );
}