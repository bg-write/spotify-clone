import styled from 'styled-components';

const StyledNotFound = styled.div`
	#not-found-page {
		background-color: salmon;
		min-height: 100vh;
	}
`;

const NotFound = () => {
	return (
		<>
			<StyledNotFound>
				<div id="not-found-page">
					<h1>404</h1>
				</div>
			</StyledNotFound>
		</>
	);
};

export default NotFound;
