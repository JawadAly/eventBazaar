import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MessageIcon from '@mui/icons-material/Message';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RedoIcon from '@mui/icons-material/Redo';
import StyleIcon from '@mui/icons-material/Style';
import GroupsIcon from '@mui/icons-material/Groups';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BadgeIcon from '@mui/icons-material/Badge';

export const TwittIcon = (props) =>{
    return <TwitterIcon fontSize={props.font}/>;
}
export const FacebIcon = (props) =>{
    return <FacebookIcon fontSize={props.font}/>;
}
export const LinkedIcon = (props) =>{
    return <LinkedInIcon fontSize={props.font}/>;
}
export const InstaIcon = (props) =>{
    return <InstagramIcon fontSize={props.font}/>;
}
export const ClockIcon = (props) =>{
    return <AccessTimeIcon fontSize={props.font} className={props.incomingClass}/>;
}
export const CalendarIcon = (props) =>{
    return <CalendarTodayIcon fontSize={props.font}/>;
}
export const TagIcon = (props) =>{
    return <LocalOfferOutlinedIcon fontSize={props.font} className='themeColor'/>;
}
export const ProfileIcon = (props) =>{
    return <AssignmentIndOutlinedIcon fontSize={props.font} className={props.colorClass}/>;
}
export const LocationIcon = (props) =>{
    return <LocationOnOutlinedIcon fontSize={props.font} className={props.colorClass}/>;
}
export const MailIcon = (props) =>{
    return <EmailIcon fontSize={props.font}/>;
}
export const PhoneIcon = (props) =>{
    return <LocalPhoneIcon fontSize={props.font}/>;
}
export const ChatIcon = (props) =>{
    return <MessageIcon fontSize={props.font}/>;
}
export const WhtsappIcon = (props) =>{
    return <WhatsAppIcon fontSize={props.font}/>;
}
export const ReduIcon = (props) =>{
    return <RedoIcon fontSize={props.font}/>;
}
export const MoreTags = (props) =>{
    return <StyleIcon fontSize={props.font}/>;
}
export const GroupIcon = (props) =>{
    return <GroupsIcon fontSize={props.font}/>;
}
export const GogleIcon = (props) =>{
    return <GoogleIcon fontSize={props.font}/>;
}
export const ArrowNextIcon = (props) =>{
    return <ArrowForwardIcon className='themeColor' fontSize={props.font}/>;
}
export const BkMarkIcon = (props) =>{
    return <BookmarksIcon className='themeColor' fontSize={props.font}/>;
}
export const BellIcon = (props) =>{
    return <NotificationsIcon className={props.colorClass} fontSize={props.font}/>;
}
export const CardIcon = (props) =>{
    return <BadgeIcon className={props.colorClass} fontSize={props.font}/>;
}