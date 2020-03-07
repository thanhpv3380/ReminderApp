import React, { Component } from 'react';

export default class List extends Component {
    render() {
        let { persons } = this.props;
        return (
            <div>
                <h2>Danh sách những con nợ <button className="btn btn-success" onClick={this.props.handleClickAdd}>Thêm</button></h2>
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>#</th>    
                            <th>Tên</th>
                            <th>Số Tiền Nợ(VND)</th>
                            <th>Thời gian</th>
                            <th>Email</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map((person, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{person.name}</td>
                                    <td>{person.money}</td>
                                    <td>{new Date(person.date).toString()}</td>
                                    <td>{person.email}</td>
                                    
                                    <td>                                
                                        <img 
                                            onClick = {this.handleClickChangeStatus}
                                            src={person.status ? "https://cdn4.iconfinder.com/data/icons/flat-game-ui-buttons-icons-2/80/1-33-512.png" :"https://cdn2.iconfinder.com/data/icons/user-needs-19/16/45_false_delete_remove_cross_wrong_2-512.png"}
                                            width="30px" 
                                        />                                                                                
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}