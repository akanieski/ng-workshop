window.onload = () => {
    console.log("[OK] Application Loaded!")

    let greetingElement = $('#greeting');

    greetingElement.text("Hello World");

    var toggleGreeting = function() {
        greetingElement.fadeToggle(500, 'swing', toggleGreeting);
    };

    toggleGreeting();
    
    
}