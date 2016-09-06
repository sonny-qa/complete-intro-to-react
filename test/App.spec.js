/* eslint-env mocha */


/* chai is the assertion library 
we want to specifically pull the expect function from the chai library*/
const {expect} = require('chai')
const React = require('react')
/* this is what we will run the test agianst */
const Search = require('../js/Search')
/* shallow will only render the top level Search component and none of its children*/
const { shallow, mount } = require('enzyme')

const ShowCard = require('../js/ShowCard')
const { shows } = require('../public/data')
const { store, rootReducer } = require('../js/Store')

xdescribe('<Search />', () => {
  it('should render the brand', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.contains(<h1 className='brand'>svideo</h1>)).to.be.true
  })

  it('should render as many shows as there are data for', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.find(ShowCard).length).to.equal(shows.length)
  })

  it('should filter correctly given new state', () => {
    const wrapper = mount(<Search />)
    const input = wrapper.find('.search-input')

    input.node.value = 'house'
    input.simulate('change')
    /*first test that the searchTerm DOM element state has been set correctly*/
    expect(wrapper.state('searchTerm')).to.equal('house')
    /*then check that the number of show-cards displayed is correct*/
    expect(wrapper.find('.show-card').length).to.equal(2)

  })
})

describe('Store', () => {
  it('should bootstrap', () => {
    /* test that the state goes from nothing to being initalised, 
    @@redux/INIT is the name of the action used to initlaise*/
    const state = rootReducer(undefined, {type: '@@redux/INIT'})
    expect(state).to.deep.equal({searchTerm: ''})
  })
  it('should handle set search term actions', () => {
    /* set the intial state as 'some random string, 
    then send in an action of type 'setsearch term, with value of 'correct string',
    this action will then get dispatched to the root reducer, 
    this root reducer will subsequently dispatch to the setsearchterm reducer
    this reducer will update part of the state, which is wholly managed by the store
    '*/
    const state = rootReducer({searchTerm: 'some random string'}, {
      type: 'setSearchTerm', value: 'correct string'}) 
    expect(state).to.deep.equal({searchTerm: 'correct string'})
  })
})
