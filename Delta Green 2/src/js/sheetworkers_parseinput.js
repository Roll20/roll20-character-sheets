


const BondButtonColor= (bondvalue) => {
    const score = parseInt(bondvalue)||0;
    const color = (score > 0) ? 'on' : 'off';
    return color;
};

const changeBondButtonColorOnOpen = () => {
    getSectionIDs(`bonds`, (idarray) => {
		const allbonds=idarray.map(id =>`repeating_bonds_${id}_score`);
        getAttrs(allbonds, (value) => {
            const update={};
            Object.entries(value).forEach(([key, value]) => {
                const id = key.split('_')[2];
                const score = parseInt(value)||0;
                update['repeating_bonds_'+id+'_color'] = BondButtonColor(score);
            });
            setAttrs(update, {silent:true}, () => {
               console.info('update',update);
               console.log('Bond color updated');

            });
        });
    });
};

