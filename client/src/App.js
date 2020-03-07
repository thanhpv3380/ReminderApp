import React, { Component } from 'react';
import axios from 'axios';
import List from './components/List/List';
import { forEach } from 'async';
class App extends Component {
    state = {
        email: {
            recipient: '',
            sender: '',
            subject: '',
            text: ''
        },
        showButtonAdd: false,
        name: '',
        money: '',
        email: '',
        persons: []
    }
    // sendEmail = () => {
    //     const { email } = this.state;
    //     fetch(`http://127.0.0.1:8080/send-email?recipient=${email.recipient}&sender=${email.sender}&topic=${email.subject}&text=${email.text}`) //query string url
    //         .catch(err => console.error(err))
    // }
    componentDidMount() {
        axios.get('/getListDebtors')
        .then(res => {
            const persons = res.data;
            this.setState({ persons });
        });

        
    }
    handleClickAdd = (e) => {
        e.preventDefault();
        this.setState({
            showButtonAdd : true
        });
    }
     handleClickCancel = (e) => {
        e.preventDefault();
        this.setState({
            showButtonAdd : false
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleAdd = (e) => {
        e.preventDefault();
        let {name, money, email, persons} = this.state;
        let date = new Date();
        
        let status = true;
        axios.post('/add', {
            name, money, email, date, status 
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        let person = persons;
        date = date.toString();
        person.push({name, money, email, date, status});
        console.log(person);
        this.setState({
            name: '',
            money: '',
            email: '',
            persons: person
        });

    }
    render() {
        const { email, showButtonAdd, name, money, persons } = this.state;
        return (
            <div class="container mt-5">
                {
                    showButtonAdd ? 
                        <div class="row">
                            <div class="col-sm-3 border p-3">
                                <i class="material-icons float-right" onClick={this.handleClickCancel}>cancel</i>
                                <form >
                                    <div class="form-group">
                                        <label className="font-weight-bold">Họ và tên:</label>
                                       
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Nhập tên"
                                            name="name"
                                            value={name}
                                            onChange={this.handleChange}

                                        />
                                    </div>
                                    <div class="form-group">
                                        <label className="font-weight-bold">Số tiền:</label>
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Nhập số tiền"
                                            name="money"
                                            value={money}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label className="font-weight-bold">Email:</label>
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Nhập Email"
                                            name="email"
                                            value={email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <button type="submit" class="btn btn-primary" onClick={this.handleAdd}>Thêm</button>
                                </form>
                            </div>      
                            <div class="col-sm-9">
                                <List 
                                    persons={persons} 
                                    handleClickAdd = {this.handleClickAdd} 
                                />
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div class="col-sm-12">
                                <List persons={persons} handleClickAdd = {this.handleClickAdd} />
                            </div>
                        </div>     
                }  
            </div>   
        );
    }
}
export default App;