import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';
import classnames from 'classnames/bind';
import styles from './AdDetails.module.css';

const cx = classnames.bind( styles );

// export const CreativeAd = ( { html } ) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export class CreativeAd extends React.Component {
  constructor(props) {
    super(props);
    this.adRef = React.createRef();
  }
  componentDidMount() {
  	console.log("asdfasdf", this.adRef, this.adRef.current);
    if (!this.adRef || !this.adRef.current) return;
  	console.log("asdfasasdfasdfdf 2");
    const link = this.adRef.current.querySelector(".see_more_link");
    if (!link) return;
  	console.log("asdfasasdfasdfdf 3");
    link.addEventListener("click", (event) => {
    	event.preventDefault();
      this.adRef.current.querySelector(".text_exposed_hide").style.display =
        "none";
      this.adRef.current.querySelector(".see_more_link").style.display = "none";
      this.adRef.current
        .querySelectorAll(".text_exposed_show")
        .forEach(node => (node.style.display = "inline"));
    });
  }

  render(){
  	return <div ref={this.adRef} dangerouslySetInnerHTML={{ __html: this.props.html }} />;
  }
}

const AdDetails = ( { ad, creativeAd } ) => {
	const { currency } = ad ? ad.ads.find( subAd => !subAd.id ) : { currency: 'USD' }; // find the FBPAC version of the ad which contains more price data
	const {
		advertiser,
		created_at,
		creation_date,
		impressions,
		paid_for_by,
		title,
		updated_at,
		html,
		text_hash
	} = creativeAd;

	const createdAt = new Date( created_at ? created_at : creation_date );
	const updatedAt = new Date( updated_at );

	return (
		<div
			className={cx( 'details-container' )}
		>
			<h4 className={cx( 'title' )}>{title}</h4>
			<h4 className={cx( 'title' )}>Advertiser: <Link to={`/advertiser/${encodeURI( advertiser )}`}>{advertiser}</Link></h4>
			<h4 className={cx( 'paid-for' )}>Paid for by {paid_for_by || 'Unknown'}</h4>
			{
				impressions
					? (
						<p className={cx( 'sub' )}>
							<span>{`${currency}`}</span> • <span>{`${impressions} ${impressions > 1 ? 'impressions' : 'impression'}`}</span>
						</p>
					) : null
			}
			<p className={cx( 'sub' )}>
				<span>First seen: {`${createdAt.toLocaleDateString( 'en-US', { dateStyle: 'full', timeStyle: 'long' } )}`}</span>
			</p>
			{
				updated_at
					? (
						<p className={cx( 'sub' )}>
							<span>Last updated: {`${updatedAt.toLocaleDateString( 'en-US', { dateStyle: 'full', timeStyle: 'long' } )}`}</span>
						</p>
					) : null
			}
{/*			<Modal
				dimmer="inverted"
				size="fullscreen"
				trigger={<Button>Ad Details</Button>}
				style={{
					minHeight: '80vh',
				}}
			>
				<div className={cx( 'modal-content' )}>
					<CreativeAd html={html} />
					<div className={cx( 'right-rail' )}>
						<p>Placeholder content (awaiting further ad data)</p>
					</div>
				</div>
			</Modal>
*/}	
			<Link to={'/ad/' + text_hash }>Ad Details</Link>
		</div>
	);
};

AdDetails.propTypes = {
	ad: PropTypes.object,
	creativeAd: PropTypes.object,
};

export default AdDetails;
