export default function IPointRender(args) {
    let materialColors = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
        '#ea7a57', '#4472c4', '#ffc000', '#5b9bd5', '#c1c1c1', '#6f6fe2', '#9e480e'];
    args.fill = materialColors[args.point.index];
}