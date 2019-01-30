describe('Test article ranker', () => {
  
  beforeEach(() => {
  
    cy.visit('http://localhost:3000')
    cy.server();
    cy.route('http://localhost:3001/posts/1', 'fixture:post1.json');
    cy.route('http://localhost:3001/posts/2', 'fixture:post2.json');
    cy.route('http://localhost:3001/posts/3', 'fixture:post3.json');
    cy.route('http://localhost:3001/posts/4', 'fixture:post4.json');
    cy.route('http://localhost:3001/posts/5', 'fixture:post5.json');
    cy.route('http://localhost:3001/posts', 'fixture:posts.json');
   
    cy.log("All the stubs should be loaded");
   
  });
  
  it('displays 5 articles 1 at a time', () => {
    cy.get('.navbar');
    cy.contains('You have read 1 of 5 articles');
    cy.get('.btn').click();

    cy.get('.navbar');
    cy.contains('You have read 2 of 5 articles');
    cy.get('.btn').click();

    cy.get('.navbar');
    cy.contains('You have read 3 of 5 articles');
    cy.get('.btn').click();

    cy.get('.navbar');
    cy.contains('You have read 4 of 5 articles');
    cy.get('.btn').click();

    cy.get('.navbar');
    cy.contains('Now please rank the 5 articles you have read')
    cy.get('.btn').click();


  });

  it('Button appears to go to ranking section when the articels are finished', () => {
    cy.get('.btn').click();
    cy.get('.btn').click();
    cy.get('.btn').click();
    cy.get('.btn').click();
    cy.get('.btn').contains('Rank the articles');

  });

 

});

describe('Ranking section renders as expected', ()=>{
  beforeEach(()=>{
    cy.clock()

    cy.visit('http://localhost:3000')
    cy.server();
    cy.route('posts/1', 'fixture:post1.json');
    cy.route('posts/2', 'fixture:post2.json');
    cy.route('posts/3', 'fixture:post3.json');
    cy.route('posts/4', 'fixture:post4.json');
    cy.route('posts/5', 'fixture:post5.json');
    cy.route('posts', 'fixture:posts.json');
    cy.log("All the stubs should be loaded");
    cy.get('.btn').click();
    cy.get('.btn').click();
    cy.get('.btn').click();
    cy.get('.btn').click();
    cy.get('.btn').click();
  });

  it('component is there', () => {
    cy.get('.sc-bwzfXH').contains('Articles drag and drop')
  
  });

  it('article titles are there', () => {
    cy.get(':nth-child(1) > .sc-bdVaJa').contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
    cy.get(':nth-child(2) > .sc-bdVaJa').contains('Praesent bibendum nec velit a fringilla. Nulla facilisi')
    cy.get(':nth-child(3) > .sc-bdVaJa').contains('Vestibulum posuere orci ullamcorper nisi porta, sit amet tempus nibh porta')
    cy.get(':nth-child(4) > .sc-bdVaJa').contains('Maecenas venenatis lorem ut erat dictum, sed varius est porta')
    cy.get(':nth-child(5) > .sc-bdVaJa').contains('Nulla nibh erat, pharetra at ultricies nec, tincidunt luctus arcu')
   
  
  });

  it("can be dragged and dropped",()=>{


    cy.get(':nth-child(1) > .sc-bdVaJa')
        .trigger('mousedown', { clientX: 0, clientY: 0 })
        .trigger('mousemove', { clientX: 0, clientY: 500 })
        .trigger('drop', {force: true})
        .tick(200)


    cy.get(':nth-child(2) > .sc-bdVaJa').first()
    .trigger('dragstart')
    cy.get(':nth-child(3) > .sc-bdVaJa')
    .trigger('drop')


    cy.get(':nth-child(1) > .sc-bdVaJa').first()
    .trigger('dragstart')
    cy.get(':nth-child(5) > .sc-bdVaJa')
    .trigger('drop')

    cy.get(':nth-child(4) > .sc-bdVaJa').first()
    .trigger('dragstart')
    cy.get(':nth-child(3) > .sc-bdVaJa')
    .trigger('drop')
    cy.clock()
    cy.tick(200)
  })
  

})