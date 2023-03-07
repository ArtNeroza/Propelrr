/**
 * Custom Container Block
 *
 * 
 */
( function() {
	var __ 					= wp.i18n.__; // The __() function for internationalization.
	var createElement 		= wp.element.createElement; // The wp.element.createElement() function to create elements.
	var registerBlockType 	= wp.blocks.registerBlockType; // The registerBlockType() function to register blocks.\

	var InnerBlocks 		= wp.blockEditor.InnerBlocks;
	var Editable 			= wp.blockEditor.Editable;
	var InspectorControls 	= wp.blockEditor.InspectorControls;
	var MediaUpload 		= wp.blockEditor.MediaUpload;
	var BlockDescription 	= wp.blockEditor.BlockDescription;
	var PanelColorSettings	= wp.blockEditor.PanelColorSettings;
	var ColorPalette		= wp.blockEditor.ColorPalette;

	var PanelBody			= wp.components.PanelBody;
	var SelectControl		= wp.components.SelectControl;
	var ToggleControl 	 	= wp.components.ToggleControl;
	var Button 				= wp.components.Button;

	//var blockStyle = '';

	/**
	 * Register block
	 *
	 * @param  {string}   name     Block name.
	 * @param  {Object}   settings Block settings.
	 * @return {?WPBlock}          Block itself, if registered successfully,
	 *                             otherwise "undefined".
	 */
	registerBlockType(
		'acn-blocks/wrapper-block', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
		{
			title: __( 'Art Wrapper' ), // Block title. __() function allows for internationalization.
			icon: 'shield', // Block icon from Dashicons. https://developer.wordpress.org/resource/dashicons/.
			category: 'acn-blocks', // Block category. Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
			attributes: {
				
				fullRow: {
					type: 'bool',
					default: false,
				},
				extraClass: {
					type: 'string',
					default: ' background ',
				},
				bgType: {
					type: 'string',
				},
				bgColor: {
					type: 'string',
					default: '#efefef',
				},
			    bgImage: {
					type: 'string',
			    },
			    bgVideo: {
					type: 'string',
			    },
			    bgVideoPoster:{
			    	type: 'string',
			    },
			    bgVideoPrev: {
					type: 'string',
			    }
			},

			getEditWrapperProps: function() {
				return {
					"data-align": "acn-full"
				}
			},
			
			// Defines the block within the editor.
			edit: function( props ) {
				//console.log(props);
				const {
					className,
					setAttributes,
					attributes,
				} = props;

				const {
					extraClass,
					bgType,
					bgImage,
					bgColor,
					fullRow,
					bgVideo,
					bgVideoPrev,
					bgVideoPoster,
				} = attributes;

				function onChangeRow( value ) {
					setAttributes( { fullRow: value } );
				}

				function onChangeType( value ) {
					setAttributes( { bgType : value } );
				}

				function onChangeColor( value ) {
					setAttributes( { bgColor : value } );
					setAttributes( { extraClass : ' has-color-background ' } );
				}

				function selectImage(value) {
	                console.log(value);
	                setAttributes({ bgImage: value.sizes.full.url, });
	                setAttributes( { extraClass : ' has-image-background ' } );
	            }

	            function destructImage(){
	            	setAttributes({ bgImage: void 0 })
	            }

	            function selectVideo(value) {
	                console.log(value);
	                setAttributes({ bgVideo: value.url, });
	                setAttributes({ bgVideoPrev: value.image.src, });
	                setAttributes( { extraClass : ' has-video-background ' } );
	            }

	            function destructVideo(){
	            	setAttributes({ bgVideo: void 0 })
	            }

	            function selectVideoPoster(value){
	            	//console.log("Video Poster is " + value.sizes.full.url, ); //check value
	            	setAttributes({ bgVideoPoster: value.sizes.full.url, })
	            }

	            function destructVideoPoster(){
	            	setAttributes({ bgVideoPoster: void 0 })
	            }

				const controls = focus && [
					createElement( InspectorControls,{},
						createElement( PanelBody,{ title: __('Background Settings') },
							createElement(
								ToggleControl,{
									label: __('Full Container'),
									checked: attributes.fullRow,
									onChange: onChangeRow,
								}
							),
							createElement( SelectControl, {
									label: __('Background Type'), 
									value: attributes.bgType,
									onChange: onChangeType,
									options: [ 
										{ label: 'None', value: 'none'},
										{ label: 'Color', value: 'color'},
										{ label: 'Image', value: 'image'},
										{ label: 'Video', value: 'video'},
									],
								},
							),//Select Control
							attributes.bgType =='color' &&
								createElement(
									ColorPalette, {
										label: __('Background Color'),
										value: attributes.bgColor,
										onChange: onChangeColor
									}
								),//Background Color
							attributes.bgType == 'image' &&
								createElement(
									'p',{}, __('Background Image')

								),
							attributes.bgType == 'image' &&
								createElement(
									MediaUpload,
									{
										onSelect: selectImage,
										onChange: selectImage,
										render( renderProps ){
											return createElement(
												'button',
												{
													className: 'button',
													onClick: renderProps.open,
												},
												!attributes.bgImage ? __('Upload Image') : __('Replace Image'),
											)
										}
									}
								),
							attributes.bgType == 'image' && attributes.bgImage &&
								 createElement(
									'button',
									{
										className: 'button components-button is-link is-destructive ',
										style: { marginLeft: '10px' },
										isLink: !0,
										isDestructive: !0,
										onClick: destructImage,
									},__('Remove Image')
								),//Image background
							attributes.bgType == 'video' &&
								createElement(
									MediaUpload,
									{
										onSelect: selectVideo,
										onChange: selectVideo,
										render( renderProps ){
											return createElement(
												'button',
												{
													className: 'button',
													onClick: renderProps.open,
												},
												!attributes.bgVideo ? __('Upload Video') : __('Replace Video'),
											)
										}
									}
								),
							attributes.bgType == 'video' && attributes.bgVideo &&
								 createElement(
									'button',
									{
										className: 'button components-button is-link is-destructive ',
										style: { marginLeft: '10px' },
										isLink: !0,
										isDestructive: !0,
										onClick: destructVideo,
									},__('Remove Video')
								),
							//poster
							attributes.bgType == 'video' && attributes.bgVideo &&
								 createElement(
									MediaUpload,
									{
										onSelect: selectVideoPoster,
										onChange: selectVideoPoster,
										render( renderProps ){
											return createElement(
												'button',
												{
													className: 'button',
													onClick: renderProps.open,
													style: { marginTop: '10px' }
												},
												!attributes.bgVideoPoster ? __('Upload Poster') : __('Replace Poster'),
											)
										}
									}
								),
							attributes.bgType == 'video' && attributes.bgVideoPoster &&
								 createElement(
									'button',
									{
										className: 'button components-button is-link is-destructive ',
										style: { marginLeft: '10px', marginTop: '10px' },
										isLink: !0,
										isDestructive: !0,
										onClick: destructVideoPoster,
									},__('Remove Poster')
								),//Image background
						),//PanelBody
					),//Inpector

				];//control

				var blockStyle = {
					backgroundColor: attributes.bgType == 'color' ? attributes.bgColor : null,
					backgroundImage: attributes.bgType == 'image' ? 'url(' + attributes.bgImage + ')' : 
									attributes.bgType == 'video' ? 'url(' + attributes.bgVideoPoster + ')': null,
				};

				/*var vidClass  = props.attributes.bgType == 'video' ? 'has-video-background' : '';
				var imgClass  = props.attributes.bgType == 'image' ? 'has-image-background' : '';
				var clrClass  = props.attributes.bgType == 'color' ? 'has-color-background' : '';

				var newClassName = (props.className || ' ') + vidClass + ' ' + imgClass + ' ' + clrClass;*/ 

				var newClassName = (props.className || ' ') + attributes.extraClass;

				return [
					controls,
					createElement(
						'div',
						{ 
							className:newClassName,
							style: blockStyle,
						},
						attributes.bgType == 'video' &&
							createElement(
								'div',{
									className: 'video-banner-container',
								},
								createElement(
									'video', {
										'loop': 'loop',
										'autoplay': 'autoplay',
										'muted': 'muted',
										'playsinline': 'playsinline',
										'poster' : attributes.bgVideoPoster,
									},
									createElement(
										'source', {
											'src': attributes.bgVideo,
											'type': 'video/mp4'
										},
									),
								),
							),
						createElement( 'div',{ className: attributes.fullRow == true ? 'full-row row' : 'row' },
							createElement( InnerBlocks,null )), //create element row
					),
				];

			},//edit

			// Defines the saved block.
			save: function( props ) {
				//console.log(props);
				const {
					className,
					setAttributes,
					attributes,
				} = props;

				const {
					extraClass,
					bgType,
					bgImage,
					bgColor,
					bgVideo,
					bgVideoPoster
				} = attributes;

				var blockStyle = {
					backgroundColor: props.attributes.bgType == 'color' ? props.attributes.bgColor : null,
					backgroundImage: attributes.bgType == 'image' ? 'url(' + attributes.bgImage + ')' :
									attributes.bgType == 'video' ? 'url(' + attributes.bgVideoPoster + ')': null,
				};
				
				/*var vidClass  = props.attributes.bgType == 'video' ? 'has-video-background' : '';
				var imgClass  = props.attributes.bgType == 'image' ? 'has-image-background' : '';
				var clrClass  = props.attributes.bgType == 'color' ? 'has-color-background' : '';

				var newClassName = (props.className || ' ') + vidClass + ' ' + imgClass + ' ' + clrClass; */

				var newClassName = (props.className || ' ') + attributes.extraClass;
				
				return createElement(
						'div',
						{
							className: newClassName,
							style: blockStyle,
						},
						attributes.bgType == 'video' &&
							createElement(
								'div',{
									className: 'video-banner-container',
								},
								createElement(
									'video', {
										'loop': 'loop',
										'autoplay': 'autoplay',
										'muted': 'muted',
										'playsinline': 'playsinline',
										'poster': attributes.bgVideoPoster,
									},
									createElement(
										'source', {
											'src': attributes.bgVideo,
											'type': 'video/mp4'
										},
									),
								),
							),
						createElement( 'div',{  className: attributes.fullRow == true ? 'full-row row' : 'row ' },
							createElement( InnerBlocks.Content, null )), //create element row
					);//create element parent div
				
			},
			

		}//register block
	);
})();