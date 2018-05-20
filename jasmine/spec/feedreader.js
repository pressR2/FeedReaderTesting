/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL defined', function() {
            allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).toBeGreaterThan(0);
         });
        });
    
        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */   
        it('have a name defined', function() {
            allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).toBeGreaterThan(0);
         });
        });
    });


    /* Test suite named "The menu" which checks functionality of menu */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('is visible when menu icon is clicked', function() {
            var e = $.Event( 'click' );

            $('.menu-icon-link').trigger(e);
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').trigger(e);
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });     

    /* Test suite named "Initial Entries" which checks functionality of loadFeed function */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should contain at least a single .entry element within .feed', function(done) {
            expect($('.feed article').hasClass('entry')).toBeTruthy();
            done();
        });
    });

    /* Test suite named "New Feed Selection" which checks functionality of feed change */
    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        let headerTextFeed0;
        beforeEach(function(done) {
            loadFeed(0, function() {
                headerTextFeed0 = $('.header-title').text();
                loadFeed(1, done);
            });            
        });
        
        it('should load new feed', function(done) {
            let headerTextFeed1 = $('.header-title').text();
            expect(headerTextFeed0).not.toBe(headerTextFeed1);
            done();
        });   
    });

}());
