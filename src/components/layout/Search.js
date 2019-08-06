import React, { Component } from 'react';
import superagent from 'superagent';
import actions from '../../actions';
import { connect } from 'react-redux';


class Search extends Component{
    constructor(){
        super()
        this.state = {
            venues : [],
            search: {
                location: '',
                query: ''
            }
        }
        this.updateSearchFilters = this.updateSearchFilters.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateSearchFilters(evt){
       this.setState({
           search : {
               [evt.target.id] : evt.target.value
           }
       })
    }

    handleSubmit(){
        console.log(this.state.search.location);
        const url = 'https://api.foursquare.com/v2/venues/search';
        const params = {
            v : '20140806',
            near: this.state.search.location,
            query: this.state.search.query,
            client_id: 'VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5n453NFD',
            client_secret: 'UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ',
        }
        superagent
            .get(url)
            .query(params)
            .set('Accept', 'application/json')
            .end((err,data)=>{
                if(err){
                    alert('OOPS: '+ err.message)
                    return
                }
                
                this.setState({
                    venues : data.body.response.venues
                })
            })
    }

    selectVenue(venue, evt){
        evt.preventDefault();
        console.log('selectvenue: '+ JSON.stringify(venue) );
        this.props.selectVenue(venue);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Search Venues</h3>
                        <input type="text" id="query" onChange={this.updateSearchFilters} placeholder="Query..."></input>
                        <input type="text" id="location" onChange={this.updateSearchFilters} placeholder="Location..."></input>
                        <button onClick={this.handleSubmit}>Search...</button>

                        <hr/>
                        <h3>Venues</h3>
                        <ol>
                            <h2>
                            {this.state.venues.map((venue, i)=>{
                                return <li key={venue.id}>
                                <a onClick={this.selectVenue.bind(this, venue)} href="#">{venue.name}</a></li>
                            })}
                            </h2>
                        </ol>
                    </div>
                    <div className="col-md-8">
                        {(this.props.venue.selectedVenue) ? this.props.venue.selectedVenue.name : 'No Venue'}

                    </div>

                </div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        venue: state.venue
    }
}

const dispatchToProps = (dispatch) =>{

    return {
        selectVenue: (venue) => dispatch(actions.selectVenue(venue))
    }
}
export default connect(stateToProps, dispatchToProps)(Search);
