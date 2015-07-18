/**
 * Created by dylanninin on 7/18/15.
 */
var CommentBox = React.createClass({

    render: function(){
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox.
            </div>
        );
    }

});

React.render(
    <CommentBox/>,
    document.getElementById('content')
);