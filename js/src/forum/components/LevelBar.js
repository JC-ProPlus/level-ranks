import Component from 'flarum/Component';
import app from 'flarum/app';
import username from 'flarum/helpers/username';

export default class LevelBar extends Component {
    config() {
        this.$().tooltip({ container: 'body' });
    }

    view() {
        const user = this.props.post.user();
        const pointsText = app.forum.attribute('reflar-level-ranks.pointsText') || app.translator.trans('reflar-level-ranks.lib.defaults.level');

        let expComments = (user.commentCount() - user.discussionCount()) * 21,
            expDiscussions = user.discussionCount() * 33;

        let expTotal = expComments + expDiscussions,
            expLevel = Math.floor(expTotal / 135),
            expPercent = (100 / 135) * ((expTotal) - (expLevel * 135));

        if (username !== app.translator.trans('core.lib.username.deleted_text')) {
            return (
                <div class="PostUser-level" title={`${expTotal} ${app.translator.trans('reflar-level-ranks.forum.desc.expText')}`}>
                <span class="PostUser-text">
                    <span class="PostUser-levelText">{pointsText}</span>
                    &nbsp;
                    <span class="PostUser-levelPoints">{expLevel}</span>
                </span>
                    <div class="PostUser-bar PostUser-bar--empty"></div>
                    <div class="PostUser-bar" style={"width: " + expPercent + '%;'}></div>
                </div>
            );
        }
    }
}
