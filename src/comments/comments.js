/**
 * Created by dylanninin on 7/18/15.
 */


var data = [
    {
        'author': 'Pete Hunt',
        'text': 'This is one comment'
    },
    {
        'author': 'Jordan Walke',
        'text': 'This is *another* comment'
    }
];


var CommentBox = React.createClass({

    loadCommentsFromServer: function(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({data:data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function(){
        return {data: []};
    },
    componentDidMount: function(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function(){
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
});


var CommentList = React.createClass({
    render: function(){
        var commentsNodes = this.props.data.map(function(comment){
            return (
                    <Comment author={comment.author}>
                        {comment.text}
                    </Comment>
                );
        });
        return (
            <div className="commentList">
                {commentsNodes}
            </div>
        );
    }

});


var CommentForm = React.createClass({
    render: function(){
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }

});


var Comment = React.createClass({
    render: function(){
       var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
       return (
           <div className="comment">
               <h2 className="commentAuthor">
                   {this.props.author}
               </h2>
               <span dangerouslySetInnerHTML={{__html: rawMarkup}}></span>
           </div>
       )
    }
});


React.render(
    <CommentBox url="comments.json" pollInterval={2000} />,
    document.getElementById('content')
);